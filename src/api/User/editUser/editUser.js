import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio, avatar } = args;
      const { user } = request;
      /* return은 마지막 실행문이기 때문에 await 없이 써도 prisma가 resolve 되서 서버에게 결과를 전달하길 기다려줌 */
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio, avatar }
      });
    }
  }
};
