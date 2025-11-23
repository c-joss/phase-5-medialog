import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://localhost/medialog_dev",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False