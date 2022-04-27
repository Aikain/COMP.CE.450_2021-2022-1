import http
import json
import logging
import mariadb
import os
import sys

from flask import Flask, jsonify
from flask_mqtt import Mqtt
from flask_socketio import SocketIO

MQTT_TOPIC_PREFIX = os.environ['MQTT_TOPIC_PREFIX']

logging.basicConfig(
    stream = sys.stdout,
    format = '%(levelname)s %(asctime)s - %(message)s',
    level = os.getenv('LOGGING_LEVEL', 'INFO').upper()
)
logger = logging.getLogger()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MQTT_USERNAME'] = os.environ['MQTT_USERNAME']
app.config['MQTT_PASSWORD'] = os.environ['MQTT_PASSWORD']
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_CLEAN_SESSION'] = True

app.config['MQTT_BROKER_URL'] = os.environ['MQTT_BROKER_URL']

if os.getenv('MQTT_TLS_ENABLED', 'False').lower() in ('true', '1', 't'):
    app.config['MQTT_BROKER_PORT'] = 8883
    app.config['MQTT_TLS_ENABLED'] = True
else:
    app.config['MQTT_BROKER_PORT'] = 1883
    app.config['MQTT_TLS_ENABLED'] = False


try:
    conn = mariadb.connect(
        host=os.environ['DB_HOST'],
        port=int(os.environ['DB_PORT']),
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASS'],
        database=os.environ['DB_NAME']
    )
except mariadb.Error as e:
    logger.error('Error connecting to MariaDB: {}'.format(e))
    sys.exit(1)

cur = conn.cursor()

mqtt = Mqtt(app)
socketio = SocketIO(app)


###########################
# DB                      #
###########################

cur.execute("""
CREATE TABLE IF NOT EXISTS cat (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL
)
""")

cur.execute("""
CREATE TABLE IF NOT EXISTS visit (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    cat_id INTEGER NOT NULL,
    visit_time DATETIME DEFAULT NOW(),
    CONSTRAINT FK_CatVisit FOREIGN KEY (cat_id) REFERENCES cat(id)
)
""")

cur.execute("""
INSERT IGNORE INTO cat (id, name) VALUES (1, 'Sämplylä'),(2, 'Sipuli')
""")
conn.commit()


def add_cat_visit(cat_id):
    logger.debug("add cat visit: {}".format(cat_id))
    cur.execute(
        """INSERT INTO visit (cat_id) VALUES (%s)""",
        (cat_id,)
    )
    conn.commit()


def get_cat_visits():
    cur.execute(
        """SELECT name, visit_time FROM visit JOIN cat c on c.id = visit.cat_id"""
    )
    return cur.fetchall()


###########################
# API routes              #
###########################

@app.route('/api/v0/feed', methods=['PATCH'])
def feed():
    handle_publish(json.dumps({
        'topic': MQTT_TOPIC_PREFIX + '/feed',
        'message': '1'
    }))

    return '', http.HTTPStatus.NO_CONTENT


@app.route('/api/v0/catvisits')
def cat_visits():
    print(json.dumps(get_cat_visits()))
    return jsonify(get_cat_visits())


###########################
# MQTT                    #
###########################


@socketio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt.publish(data['topic'], data['message'])


@socketio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt.subscribe(data['topic'])


@socketio.on('unsubscribe_all')
def handle_unsubscribe_all():
    mqtt.unsubscribe_all()


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    if message.topic != MQTT_TOPIC_PREFIX + '/catvisit':
        logger.debug('ignore topic: {}'.format(message.topic))
        return

    add_cat_visit(message.payload.decode())


@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
    logger.debug('handle logging: {}, {}'.format(level, buf))


@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    logger.debug('handle connect: {}, {}, {}, {}'.format(client, userdata, flags, rc))

    mqtt.subscribe(MQTT_TOPIC_PREFIX + '/catvisit')


if __name__ == '__main__':
    # important: Do not use reloader because this will create two Flask instances.
    # Flask-MQTT only supports running with one instance
    socketio.run(app, host='0.0.0.0', port=5000, use_reloader=False)
