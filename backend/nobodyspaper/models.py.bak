from django.db import models
from django.utils.text import slugify

class Article(models.Model):
    CATEGORY_CHOICES = [
        ('notat', 'Notat'),
        ('tanke', 'Tanke'),
        ('essay', 'Essay'),
        ('fragment', 'Fragment'),
    ]

    STATUS_CHOICES = [
        ('draft', 'Utkast'),
        ('published', 'Publisert'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='notat')
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    copy_count = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
