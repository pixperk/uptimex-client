import { IMonitorErrorMessage } from '@/interfaces/monitor.interface';
import { ISSLMonitorDocument } from '@/interfaces/ssl.interface';
import { z } from 'zod';

const domainRegex = /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export const sslSchema = z.object({
  name: z
    .string({ required_error: 'Display name is a required field.' })
    .min(2, { message: 'Display name is a required field.' }),

  url: z
    .string({ required_error: 'URL is a required field.' })
    .regex(domainRegex, 'A valid HTTPS domain (e.g., https://example.com) is required.'),

  notificationId: z
    .number({ required_error: 'Please select a notification group.' })
    .gt(0, 'Please select a notification group.'),

  alertThreshold: z
    .number({ required_error: 'Alert threshold must be a positive number.' })
    .gte(0, 'Alert threshold must be a positive number.')
});

export const sslSchemaValidation = (monitorInfo: ISSLMonitorDocument): IMonitorErrorMessage => {
  let errors: IMonitorErrorMessage = {};
  const result = sslSchema.safeParse(monitorInfo);
  if (!result.success) {
    for (const item of result.error.issues) {
      errors[`${item.path[0]}`] = item.message;
    }
  }
  return errors;
};
