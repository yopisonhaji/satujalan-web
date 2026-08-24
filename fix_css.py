import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the content inside <style>
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    style_content = style_match.group(1)
    
    # We want to extract ALL rules that start with [data-theme="light"]
    # And we want to extract the lang-dropdown block
    
    # Let's just grab the whole thing and filter lines, or do it block by block
    # CSS parser? No, just simple regex
    
    # Extract lang dropdown: from /* Language Dropdown */ to /* Grid overlay */
    lang_dropdown = re.search(r'(/\* Language Dropdown \*/.*?)(?:/\* Grid overlay \*/)', style_content, re.DOTALL)
    
    # Extract light theme: from /* ============================================================
    #       LIGHT THEME to the next /* ============
    light_theme = re.search(r'(/\* ={10,}\s*LIGHT THEME.*?\*/.*?)(?:/\* ={10,}|$)', style_content, re.DOTALL)
    
    append_css = ""
    if light_theme:
        append_css += "\n\n" + light_theme.group(1)
    if lang_dropdown:
        append_css += "\n\n" + lang_dropdown.group(1)
        
    if append_css:
        with open('style.css', 'a', encoding='utf-8') as f:
            f.write(append_css)
        print("Successfully appended CSS to style.css")
    else:
        print("Could not find the blocks")
else:
    print("Could not find <style> block")
