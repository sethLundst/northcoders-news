import axios from "axios";

export const api = axios.create({
  baseURL: "https://nc-news-lundst.herokuapp.com",
});

export function getArticle(id) {
  return api.get(`/articles/${id}`);
}

export function getArticles(params) {
  return api.get("/articles", {
    params: params,
  });
}

export function getArticlesByTopic(params) {
  return api.get("/articles", {
    params: params,
  });
}

export function getComments(id, params) {
  return api.get(`/articles/${id}/comments`, {
    params: params,
  });
}

export function getVotes(username) {
  return api.get(`/votes/${username}`);
}

export function postArticleVote(username, article_id, downvote_upvote) {
  return api.post(`/votes/${username}/articles`, {
    article_id: article_id,
    downvote_upvote: downvote_upvote,
  });
}

export function postCommentVote(username, comment_id, downvote_upvote) {
  return api.post(`/votes/${username}/comments`, {
    comment_id: comment_id,
    downvote_upvote: downvote_upvote,
  });
}

export function deleteArticleVote(username, article_id) {
  return api.delete(`/votes/${username}/${article_id}/articles`);
}

export function deleteCommentVote(username, comment_id) {
  return api.delete(`/votes/${username}/${comment_id}/comments`);
}

export function postArticle(author, title, body, topic) {
  return api.post("/articles", {
    author: author,
    title: title,
    body: body,
    topic: topic,
  });
}

export function patchArticle(id, vote) {
  return api.patch(`/articles/${id}`, { inc_votes: vote });
}

export function deleteArticle(id) {
  return api.delete(`/articles/${id}`);
}

export function postComment(id, body, user) {
  return api.post(`/articles/${id}/comments`, {
    body: body,
    username: user,
  });
}

export function patchComment(id, vote) {
  return api.patch(`/comments/${id}`, { inc_votes: vote });
}

export function deleteComment(id) {
  return api.delete(`/comments/${id}`);
}

export function getTopics() {
  return api.get("/topics");
}
