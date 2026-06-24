from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserProfileView, ProductListView, ProductDetailView, OrderCreateView, OrderListView, WishlistToggleView, WishlistListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserProfileView.as_view(), name='user_profile'),
    path('products/', ProductListView.as_view(), name='product_list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product_detail'),
    path('order/', OrderCreateView.as_view(), name='order_create'),
    path('orders/', OrderListView.as_view(), name='order_list'),
    path('wishlist/', WishlistListView.as_view(), name='wishlist_list'),
    path('wishlist/toggle/', WishlistToggleView.as_view(), name='wishlist_toggle'),
]
