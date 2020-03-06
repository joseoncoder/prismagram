import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 jwt를 찾는 역할
  secretOrKey: process.env.JWT_SECRET
};

//(5) payload에 해석된 user id로 해당 user 정보 추출
const veryfyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

//(2) server.js 로 부터 호출됨
export const authenticateJwt = (req, res, next) =>
  passport.authenticate(
    "jwt",
    { session: false },
    /* (6) callback Func req.user에 해석된 user 정보 추가 후 graphql 호출⬇️  */
    (error, user) => {
      if (user) {
        req.user = user;
      }
      next();
    }
  )(req, res, next);

//(4) Strategy 함수를 통해 jwt 토큰 추출(jwtOptions 에 정의) 후 veryfyUser를 payload와 함께 호출
passport.use(new Strategy(jwtOptions, veryfyUser));
passport.initialize();
