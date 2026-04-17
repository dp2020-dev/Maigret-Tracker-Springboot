import { execSync } from 'child_process';
import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('Resetting test database to clean seed state...');
  execSync('cp test-seed.db test.db');
  console.log('Test database ready.');
}

export default globalSetup;