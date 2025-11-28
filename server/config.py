import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://localhost/medialog_dev",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = (
        os.environ.get("MAIL_SERVER")
        or os.environ.get("SMTP_HOST")
        or "sandbox.smtp.mailtrap.io"
    )

    MAIL_PORT = int(
        os.environ.get("MAIL_PORT")
        or os.environ.get("SMTP_PORT", 587)
    )

    MAIL_USERNAME = (
        os.environ.get("MAIL_USERNAME")
        or os.environ.get("SMTP_USERNAME")
    )

    MAIL_PASSWORD = (
        os.environ.get("MAIL_PASSWORD")
        or os.environ.get("SMTP_PASSWORD")
    )

    MAIL_FROM = (
        os.environ.get("MAIL_FROM")
        or os.environ.get("SMTP_FROM")
        or "MediaLog <no-reply@medialog.test>"
    )
    MAILTRAP_API_TOKEN = os.environ.get("MAILTRAP_API_TOKEN")
    MAILTRAP_INBOX_ID = os.environ.get("MAILTRAP_INBOX_ID")