/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Jalur Peran (16 Career Roles) Types & Schemas
 * Compliant with PATCH v9.1 Bagian B specification.
 */

import { z } from 'zod';
import { DomainId } from './skills';

export const RoleDomainReqSchema = z.object({
  domainId: z.string(),
  targetTier: z.number().min(1).max(7),
  weight: z.number().min(1).max(5),
  keySkills: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type RoleDomainReq = z.infer<typeof RoleDomainReqSchema>;

export const RoleSkillRequirementSchema = z.object({
  skillId: z.string(),
  domainId: z.string(),
  name: z.string(),
  targetTier: z.number().min(1).max(7),
  weight: z.number().min(1).max(5),
  isKeySkill: z.boolean().default(false),
});

export type RoleSkillRequirement = z.infer<typeof RoleSkillRequirementSchema>;

export const RoleSchema = z.object({
  id: z.string().min(3),
  name: z.string().min(3),
  tagline: z.string(),
  description: z.string().min(10),
  icon: z.string(),
  reviewStatus: z.literal('draf'),
  disclaimer: z.string(),
  domainRequirements: z.array(RoleDomainReqSchema).min(5),
  skills: z.array(RoleSkillRequirementSchema),
  recommendedCases: z.array(z.string()).default([]),
  plannedCases: z.array(z.string()).default([]),
});

export type Role = z.infer<typeof RoleSchema>;

export interface RoleReadinessResult {
  roleId: string;
  roleName: string;
  readinessPercent: number; // 0 - 100
  kesiapanTotal: number;
  kesiapanBagianTersedia: number;
  bobotTersedia: number;
  bobotBelumTersedia: number;
  availableSkillsCount: number;
  totalSkillsCount: number;
  unavailableSkillsPercent: number;
  gaps: Array<{
    skillId: string;
    skillName: string;
    domainId: string;
    targetTier: number;
    currentMastery: number;
    weight: number;
    gap: number; // target - current (scaled)
    priorityScore: number; // weight * gap
    recommendedLessons: string[];
  }>;
  disclaimer: string;
}
