import { execSync } from 'child_process';
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('Restoring test database after suite...');
  execSync('cp test-seed.db test.db');
  console.log('Test database restored.');
}

export default globalTeardown;