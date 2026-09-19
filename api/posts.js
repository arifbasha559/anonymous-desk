import { api } from "./client";

// ── Posts ──
export const listPosts = ({ page = 1, limit = 20, categoryId, tag, search, sort = "recent" } = {}) =>
  api.get("/posts", { page, limit, categoryId, tag, search, sort });

export const getPost = (postId) => api.get(`/posts/${postId}`);

export const createPost = ({ title, body, categoryId, tags }) =>
  api.post("/posts", { title, body, categoryId, tags });

export const upvotePost = (postId) => api.post(`/posts/${postId}/upvote`);

export const deletePost = (postId) => api.delete(`/posts/${postId}`);

// ── Replies ──
export const listReplies = (postId) => api.get(`/posts/${postId}/replies`);

export const createReply = (postId, { body, parentReplyId }) =>
  api.post(`/posts/${postId}/replies`, { body, parentReplyId });

export const markReplyHelpful = (replyId) => api.post(`/replies/${replyId}/helpful`);

export const deleteReply = (replyId) => api.delete(`/replies/${replyId}`);

// ── Profile / Karma ──
export const getMyProfile = () => api.get("/users/me/profile");
export const getMyKarma = () => api.get("/users/me/karma");

// ── Notifications ──
export const listNotifications = ({ page = 1, limit = 20, unreadOnly = false } = {}) =>
  api.get("/notifications", { page, limit, unreadOnly });
export const markNotificationRead = (id) => api.patch(`/notifications/${id}/read`);
export const markAllNotificationsRead = () => api.patch("/notifications/read-all");

// ── Reports ──
export const reportPost = (postId, { reason, details }) =>
  api.post(`/posts/${postId}/report`, { reason, details });
export const reportReply = (replyId, { reason, details }) =>
  api.post(`/replies/${replyId}/report`, { reason, details });
