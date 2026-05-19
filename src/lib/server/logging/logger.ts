type Level = 'error' | 'warn' | 'info' | 'debug';

const queue: { level: Level; message: string; context?: Record<string, unknown> }[] = [];

function flush() {
  while (queue.length > 0) {
    const entry = queue.shift()!;
    const line = JSON.stringify({
      t: new Date().toISOString(),
      level: entry.level,
      msg: entry.message,
      ...entry.context
    });
    if (entry.level === 'error') {
      console.error(line);
    } else if (entry.level === 'warn') {
      console.warn(line);
    } else {
      console.log(line);
    }
  }
}

let flushing = false;
function enqueue(level: Level, message: string, context?: Record<string, unknown>) {
  queue.push({ level, message, context });
  if (!flushing) {
    flushing = true;
    queueMicrotask(() => { flush(); flushing = false; });
  }
}

export const logger = {
  error: (msg: string, ctx?: Record<string, unknown>) => enqueue('error', msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => enqueue('warn', msg, ctx),
  info: (msg: string, ctx?: Record<string, unknown>) => enqueue('info', msg, ctx),
  debug: (msg: string, ctx?: Record<string, unknown>) => enqueue('debug', msg, ctx)
};
