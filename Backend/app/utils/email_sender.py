import smtplib
from email.mime.text import MIMEText


def send_email(to_email, subject, body):
    sender_email = "your_email@gmail.com"
    sender_password = "your_app_password"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())
        server.quit()

        return {
            "success": True,
            "message": "Email sent successfully"
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }