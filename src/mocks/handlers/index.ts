import { applicantsHandlers } from './applicants.handlers';
import { applicationsHandlers } from './applications.handlers';
import { authHandlers } from './auth.handlers';
import { talentPoolsHandlers } from './talent-pools.handlers';

export const handlers = [...authHandlers, ...applicantsHandlers, ...applicationsHandlers, ...talentPoolsHandlers];
