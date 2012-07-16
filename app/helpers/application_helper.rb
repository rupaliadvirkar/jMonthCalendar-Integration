# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
def generate_loader_big(div,middle='')
if div != '' 
  if middle != ''
    loading = "jQuery('#"+div+"').html('<div align=\"center\">"+image_tag("ajax-loader.gif", :class => "ajax")+"</div><div align=\"center\">Loading...Please Wait!</div><br/>')"
  else
    loading = "jQuery('#"+div+"').html('<div class=\"pageheading1\">Loading...Please Wait!</div><div id=\"faux1_form\"><div id=\"leftcolumn1_form\" style=\"text-align: center;\">"+image_tag("ajax-loader.gif",  :class => "ajax")+"<div class=\"clear\"></div></div><div class=\"clear\"></div></div><div class=\"pagefooter1_form\"></div>')"
  end
else
  loading = "jQuery('#updatediv').html('<div class=\"pageheading1\">Loading...Please Wait!</div><div id=\"faux1_form\"><div id=\"leftcolumn1_form\" style=\"text-align: center;\">"+image_tag("ajax-loader.gif", :class => "ajax")+"<div class=\"clear\"></div></div><div class=\"clear\"></div></div><div class=\"pagefooter1_form\"></div>')"
end  
return loading
end
end
