import admin from "firebase-admin";
import redisClient from "../../config/db.redis";
import { DeviceToken } from "../models/device_token.dto";
import { fcmDto } from "../models/api-util/fcm/fcm.dto";

export const pushCommentAlarm = async function (
  req: fcmDto,
  type: "blog" | "mvp" | "community"
) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  const formattedDate = req.created_at.toLocaleDateString("ko-KR", options);

  let message: string = "";
  switch (type) {
    case "community":
      message = `${formattedDate} [커뮤니티] 내가 쓴 글에 댓글이 달렸어요.`;
    case "blog":
      message = `${formattedDate} 나의 [블로그] 게시물에 댓글이 달렸어요.`;
    case "mvp":
      message = `${formattedDate} 나의 [MVP] 게시물에 댓글이 달렸어요.`;
  }

  pushAlarm(req.user_id, "", message);
};

export const pushLikeAlarm = async function (
  req: fcmDto,
  type: "blog" | "mvp" | "community"
) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  const formattedDate = req.created_at.toLocaleDateString("ko-KR", options);

  let message: string = "";
  switch (type) {
    case "community":
      message = `${formattedDate} [커뮤니티] 내가 쓴 글에 좋아요 반응이 있어요.`;
    case "blog":
      message = `${formattedDate} 나의 [블로그] 게시물에 좋아요 반응이 있어요.`;
    case "mvp":
      message = `${formattedDate} 나의 [MVP] 게시물에 좋아요 반응이 있어요.`;
  }

  pushAlarm(req.user_id, "", message);
};

export const pushReplyAlarm = async function (
  req: fcmDto,
  type: "blog" | "mvp" | "community"
) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  const formattedDate = req.created_at.toLocaleDateString("ko-KR", options);

  let message: string = "";
  switch (type) {
    case "community":
      message = `${formattedDate} [커뮤니티] 나의 댓글에 대댓글이 달렸어요.`;
    case "blog":
      message = `${formattedDate} [블로그] 나의 댓글에 대댓글이 달렸어요.`;
    case "mvp":
      message = `${formattedDate} [MVP] 나의 댓글에 대댓글이 달렸어요.`;
  }

  pushAlarm(req.user_id, "", message);
};

export const pushAlarm = async function (
  userId: string,
  title: string,
  message: string
) {
  // redis에서 userId로 가져오기
  const deviceTokens = await getDeviceToken(userId);

  deviceTokens.map((token) => {
    admin
      .messaging()
      .send({
        notification: {
          title: title,
          body: message,
        },
        token: token.token,
      })
      .then((res) => {
        console.log("fcm success", res);
      })
      .catch((err) => {
        console.log("fcm failed", err);
      });
  });
};

export const updateDeviceToken = async function (
  userId: string,
  deviceToken: string
) {
  let deviceTokens = await getDeviceToken(userId);
  const currentTime = new Date();

  const existingTokenIndex = deviceTokens.findIndex(
    (token) => token.token === deviceToken
  );

  // redis에 deviceToken이 존재하다면 -> 기존 토큰 삭제
  if (existingTokenIndex !== -1) {
    deviceTokens.splice(existingTokenIndex, 1);
  }

  // 새로운 토큰 생성
  const newDeviceToken: DeviceToken = {
    token: deviceToken,
    updated_at: currentTime,
  };

  deviceTokens.push(newDeviceToken);

  await saveDeviceTokens(userId, deviceTokens);
};

// device token 목록 가져오기
const getDeviceToken = async function (userId: string): Promise<[DeviceToken]> {
  const redisTokens = await redisClient.get(userId + "_fcm");
  const deviceTokens: [DeviceToken] = redisTokens
    ? JSON.parse(redisTokens)
    : [];

  return deviceTokens;
};

// device token 저장하기
const saveDeviceTokens = async function (
  userId: string,
  deviceTokens: [DeviceToken]
) {
  await redisClient.set(userId + "_fcm", JSON.stringify(deviceTokens));
};
