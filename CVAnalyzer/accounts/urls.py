from .views import UserSignupView, LoginView
from django.urls import path

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]