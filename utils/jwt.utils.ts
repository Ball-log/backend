import { promisify } from 'util';
import jwt, { Secret, JwtPayload  } from 'jsonwebtoken';
import redisClient from './redis';
import { config } from 'dotenv';
import { req_login } from '../src/interface/user/login.interface';

config();

const secret: string | undefined = process.env.SECRET
if (!secret) {
  throw new Error("JWT secret is not defined in environment variables");
}

const sign = (user: req_login) => { // access token 발급
  const payload = { // access token에 들어갈 payload
    email: user.email,
    password: user.password,
  };

  return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
    algorithm: 'HS256', // 암호화 알고리즘
    expiresIn: '1h', 	  // 유효기간
  });
};

const verify = (token: string) => {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      return {
        ok: true,
        email: decoded.email,
        password: decoded.password,
      };
    } catch (err) {
      return {
        ok: false,
        message: err
      };
    }
  };

const refresh = () => { // refresh token 발급
  return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
    algorithm: 'HS256',
    expiresIn: '14d',
  });
};

const refreshVerify = async (token: string, userId: string) => { // refresh token 검증
  /* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
     promisify를 이용하여 promise를 반환하게 해줍니다.*/
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const data = await getAsync(userId);
    if (token === data) {
      try {
        jwt.verify(token, secret);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export { sign, verify, refresh, refreshVerify };