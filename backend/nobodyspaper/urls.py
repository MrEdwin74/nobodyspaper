from django.urls import path
from django.urls import path
from .views import ArticleList, ArticleDetail, IncrementCopyCount, InfoPageDetail

urlpatterns = [
    path('articles/', ArticleList.as_view(), name='article-list'),
    path('articles/<slug:slug>/', ArticleDetail.as_view(), name='article-detail'),
    path('articles/<slug:slug>/copy/', IncrementCopyCount.as_view(), name='increment-copy-count'),
    path('infopages/<slug:slug>/', InfoPageDetail.as_view(), name='infopage-detail'),
]
