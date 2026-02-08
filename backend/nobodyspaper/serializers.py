from rest_framework import serializers
from .models import Article, InfoPage
import re

class InfoPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoPage
        fields = ['title', 'slug', 'content', 'updated_at']

class InfoPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoPage
        fields = ['title', 'slug', 'content', 'updated_at']

class ArticleSerializer(serializers.ModelSerializer):
    first_image = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'category', 'excerpt', 
            'content', 'status', 'created_at', 'copy_count',
            'first_image'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'copy_count']

    def get_first_image(self, obj):
        if not obj.content:
            return None
        # Find the first image src
        match = re.search(r'<img[^>]+src="([^">]+)"', obj.content)
        if match:
            return match.group(1)
        return None
