import "./env";
//pakage.json에 정의되어 있고 그 위치(?)의 파일에서만 .env 파일을 찾음
//require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }) //(7) passport에서 return된 정보를 context에 request로 저장
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt); //(1) server로 들어오는 모든 요청은 이곳을 통과 psspot.js의 authenticateJwt 함수 호출

server.start({ port: PORT }, () =>
  console.log(`🔎 server running on http://localhost:${PORT}`)
);
