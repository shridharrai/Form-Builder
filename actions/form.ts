"use server";

import prisma from "@/lib/prisma";
import { formSchema, FormSchemaType } from "@/schemas";
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

export async function createForm(data: FormSchemaType) {
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

export async function getFormById(id: number) {
  const user = await getCurrentUser();

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function updateFormContent(id: number, jsonContent: string) {
  const user = await getCurrentUser();
  if (!user) throw new UserNotFoundErr();

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function publishForm(id: number) {
  const user = await getCurrentUser();
  if (!user) throw new UserNotFoundErr();

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    },
  });
}
