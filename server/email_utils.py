import logging
import smtplib
from email.message import EmailMessage
from flask import current_app

logger = logging.getLogger(__name__)

def send_items_export_email(user, csv_bytes: bytes):
    cfg = current_app.config

    host = cfg.get("MAIL_SERVER")
    port = cfg.get("MAIL_PORT")
    username = cfg.get("MAIL_USERNAME")
    password = cfg.get("MAIL_PASSWORD")
    from_addr = cfg.get("MAIL_FROM") or username

    if not (host and port and username and password):
        logger.warning("SMTP not fully configured; skipping export email")
        return

    msg = EmailMessage()
    msg["Subject"] = "Your MediaLog export"
    msg["From"] = from_addr
    msg["To"] = user.email
    msg.set_content(
        f"Hi {user.first_name or user.username},\n\n"
        "Attached is your MediaLog collection export as a CSV file."
    )

    msg.add_attachment(
        csv_bytes,
        maintype="text",
        subtype="csv",
        filename="medialog-export.csv",
    )

    try:
        with smtplib.SMTP(host, port) as smtp:
            smtp.starttls()
            smtp.login(username, password)
            smtp.send_message(msg)
    except Exception as exc:
        logger.error("Failed to send export email to %s: %s", user.email, exc)