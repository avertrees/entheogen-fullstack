'use server'

import { revalidatePath } from 'next/cache'

export const update = async (paths = []) => paths.forEach((p) => revalidatePath(p))