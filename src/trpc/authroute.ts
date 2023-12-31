import { SignUpSchema } from "../lib/authSchema";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      try {
        const payload = await getPayloadClient();

        //check user already exist
        const { docs: users } = await payload.find({
          collection: "users",
          where: {
            email: {
              equals: email,
            },
          },
        });

        if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

        await payload.create({
          collection: "users",
          data: {
            email,
            password,
            role: "user",
          },
        });

        return { success: true, sendToEmail: email };
      } catch (error: any) {
        console.error("Error in createPayloadUser:", error);
        throw new TRPCError({ code: "BAD_REQUEST", message: error.message });
      }
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();
      const { res } = ctx;

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true };
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
