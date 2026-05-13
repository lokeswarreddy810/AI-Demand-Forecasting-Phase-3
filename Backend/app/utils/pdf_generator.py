from reportlab.pdfgen import canvas


def create_pdf(file_path, rows):
    pdf = canvas.Canvas(file_path)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(220, 800, "Forecast Report")

    y = 760
    pdf.setFont("Helvetica", 10)

    for row in rows:
        text = f"{row['Product Name']} | {row['Forecast Date']} | {row['Predicted Quantity']}"
        pdf.drawString(50, y, text)
        y -= 20

        if y < 50:
            pdf.showPage()
            y = 800

    pdf.save()