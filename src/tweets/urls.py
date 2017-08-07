from django.conf.urls import url
from .views import TweetCreateView, TweetDeleteView, TweetDetailView, TweetListView, TweetUpdateView

urlpatterns = [
    url(r'^$', TweetListView.as_view(), name="list"),  # /tweets/
    url(r'^create/$', TweetCreateView.as_view(), name="detail"),  # /tweets/create/
    url(r'^(?P<pk>\d+)/$', TweetDetailView.as_view(), name="create"),  # /tweets/<id>/
    url(r'^(?P<pk>\d+)/edit/$', TweetUpdateView.as_view(), name="edit"),  # /tweets/<id>/edit
    url(r'^(?P<pk>\d+)/delete/$', TweetDeleteView.as_view(), name="delete"),  # /tweets/<id>/delete
]
