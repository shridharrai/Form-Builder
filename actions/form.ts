"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {}

async function getCurrentUser() {
  const user = await currentUser();

  if (!user) throw new UserNotFoundErr();

  return user;
}

export async function getFormStats() {
  const user = await getCurrentUser();

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  let bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}

export async function createForm(data: formSchemaType) {
  const user = await getCurrentUser();

  const validation = formSchema.safeParse(data);
  if (!validation.success) throw new Error("Form not valid");

  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });
  if (!form) throw new Error("Error while form creation");

  return form.id;
}

export async function getForms() {
  const user = await getCurrentUser();

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
