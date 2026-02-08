from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Article, InfoPage

@admin.register(Article)
class ArticleAdmin(SummernoteModelAdmin):
    list_display = ('title', 'category', 'status', 'created_at', 'copy_count')
    list_filter = ('status', 'category')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('copy_count',)
    summernote_fields = ('content',)

@admin.register(InfoPage)
class InfoPageAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    list_display = ('title', 'slug', 'updated_at')
