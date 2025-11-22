import os

from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

from .models import db

load_dotenv()


def create_app():

    app = Flask(__name__)

    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        database_url = "postgresql+psycopg2://localhost/medialog_dev"

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    @app.route("/")
    def index():
        return jsonify({"message": "Medialog API is running"}), 200

    return app

app = create_app()