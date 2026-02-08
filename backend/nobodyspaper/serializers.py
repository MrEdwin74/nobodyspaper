from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'category', 'excerpt', 
            'content', 'status', 'created_at', 'copy_count'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'copy_count']
