REQUIRED_COLUMNS = [
    "date",
    "product_name",
    "category",
    "quantity_sold",
    "sales_amount"
]


def validate_columns(columns):
    for column in REQUIRED_COLUMNS:
        if column not in columns:
            return f"Missing required column: {column}"
    return None