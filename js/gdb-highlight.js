// 最终版：依赖 Hexo 内置 Highlight.js，无需手动加载
function initPwndbgHighlight() {
  // 检查依赖（Hexo 会自动加载 hljs，这里直接使用）
  if (typeof hljs === 'undefined') {
    console.error('❌ Pwndbg 高亮：Hexo 未自动加载 Highlight.js（检查根目录 _config.yml 配置）');
    return;
  }
  if (!window.pwndbgTheme) {
    console.error('❌ Pwndbg 高亮：pwndbg-config.js 未加载（检查路径/文件名）');
    return;
  }

  // 1. 注册 Pwndbg 专属高亮语言
  if (!hljs.getLanguage('pwndbg')) {
    hljs.registerLanguage('pwndbg', function(hljs) {
      return {
        name: 'Pwndbg Debug Output',
        case_insensitive: false,
        keywords: {
          register: 'rsp rbp rax rbx rcx rdx rsi rdi r8 r9 r10 r11 r12 r13 r14 r15 rip ' +
                    'eip esp ebp eax ebx ecx edx esi edi cpsr fsbase gsbase pc sp lr ip',
          command: 'telescope context heap bins fastbins tcache vmmap nearpc disassemble ' +
                    'print p x x/10gx search leakfind onegadget canary retaddr step next continue ' +
                    'break run info frame bt backtrace',
          instruction: 'endbr64 mov add sub push pop ret call hlt jmp cmp lea xor and or test ' +
                       'movzx movsx inc dec neg mul div pushf popf iret syscall nop int leave ' +
                       'rep repnz repz cmpsb cmpsw cmpsd scasb scasw scasd'
        },
        contains: [
          { className: 'pwndbg-index', begin: /^\d{2}:\d{4}│/, relevance: 10 },
          { className: 'pwndbg-offset', begin: /([+-]\d{3,4})|([a-zA-Z_][a-zA-Z0-9_]*\+\d+)/, relevance: 8 },
          { className: 'pwndbg-address', begin: /0x[0-9a-fA-F]{4,16}/, relevance: 10 },
          { className: 'pwndbg-symbol', begin: /—▸|◂—|->/, relevance: 5 },
          { className: 'pwndbg-instruction', begin: /\b(endbr64|mov|add|sub|push|pop|ret|call|hlt|jmp|cmp|lea|xor|and|or|test|syscall)\b/, relevance: 9 },
          { className: 'pwndbg-string', begin: /'(.*?)'/, end: /'/, relevance: 8 },
          { className: 'pwndbg-string', begin: /\/[a-zA-Z0-9_\/.+-]+/, relevance: 8 },
          { className: 'pwndbg-function', begin: /\b([a-zA-Z_][a-zA-Z0-9_]*)\(/, end: /\)/, excludeEnd: true, relevance: 9 },
          { className: 'pwndbg-comment', begin: /(\/\/|#)/, end: /$/, relevance: 5 },
          { className: 'pwndbg-register-value', begin: /\b(0x[0-9a-fA-F]{1,8}|\d+)\b/, relevance: 7, excludeBegin: /0x[0-9a-fA-F]{4,16}|[+-]\d{3,4}/ }
        ]
      };
    });
    console.log('✅ Pwndbg 语言注册成功');
  }

  // 2. 高亮代码块（适配 Theme Redefine 结构）
  const codeBlocks = document.querySelectorAll('figure.highlight.language-pwndbg code');
  if (codeBlocks.length === 0) {
    console.warn('⚠️ 未找到 pwndbg 代码块（检查 Markdown 标记是否为 ```pwndbg）');
    return;
  }
  codeBlocks.forEach(function(block) {
    hljs.highlightElement(block);
  });
  console.log(`✅ Pwndbg 高亮生效：${codeBlocks.length} 个代码块`);
}

// 延迟 300ms 执行，确保 Hexo 和主题加载完成
setTimeout(initPwndbgHighlight, 300);

// 明暗模式切换刷新
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
  location.reload();
});