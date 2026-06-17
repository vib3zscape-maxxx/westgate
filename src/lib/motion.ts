import * as Motion from '@motionone/react';

const MotionModule = Motion as any;
export const motion = MotionModule.motion ?? MotionModule.default ?? MotionModule;
