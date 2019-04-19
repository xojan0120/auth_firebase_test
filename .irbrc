IRB.conf[:PROMPT_MODE] = :SIMPLE
IRB.conf[:AUTO_INDENT_MODE] = false

# Hirbを有効化する
if defined? Rails::Console
  if defined? Hirb
    Hirb.enable
  end
end
