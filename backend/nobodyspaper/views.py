from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Article, InfoPage
from .serializers import ArticleSerializer, InfoPageSerializer

class ArticleList(generics.ListAPIView):
    queryset = Article.objects.filter(status='published').order_by('-created_at')
    serializer_class = ArticleSerializer

class ArticleDetail(generics.RetrieveAPIView):
    queryset = Article.objects.filter(status='published')
    serializer_class = ArticleSerializer
    lookup_field = 'slug'

class IncrementCopyCount(APIView):
    def post(self, request, slug):
        article = get_object_or_404(Article, slug=slug, status='published')
        article.copy_count += 1
        article.save()
        return Response({'copy_count': article.copy_count}, status=status.HTTP_200_OK)

class InfoPageDetail(generics.RetrieveAPIView):
    queryset = InfoPage.objects.all()
    serializer_class = InfoPageSerializer
    lookup_field = 'slug'
