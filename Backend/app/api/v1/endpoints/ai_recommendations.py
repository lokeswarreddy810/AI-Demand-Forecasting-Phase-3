from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.services.ai_recommendation_service import (
    get_product_demand_recommendations,
    get_customer_buying_behavior,
    get_demand_spikes,
    get_low_stock_predictions,
    get_inventory_optimization
)

router = APIRouter()


@router.get("/product-demand")
def product_demand(
    db: Session = Depends(get_db)
):
    return get_product_demand_recommendations(db)


@router.get("/customer-buying-behavior")
def customer_buying_behavior(
    db: Session = Depends(get_db)
):
    return get_customer_buying_behavior(db)


@router.get("/demand-spike")
def demand_spike(
    db: Session = Depends(get_db)
):
    return get_demand_spikes(db)


@router.get("/low-stock")
def low_stock(
    db: Session = Depends(get_db)
):
    return get_low_stock_predictions(db)


@router.get("/inventory-optimization")
def inventory_optimization(
    db: Session = Depends(get_db)
):
    return get_inventory_optimization(db)