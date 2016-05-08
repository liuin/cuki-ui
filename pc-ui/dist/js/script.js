 (function() {
      var formSting = '[data-form="select"]';
      var Select = function  (number) {
        this.id = number;
      }
    
      Select.prototype.build = function  (el) {
        var $this = $(el);
        $this.css("opacity","0");
        $this.wrap("<span class='selectstyle'></span>");
        var gettxt = '<span class="val textb" >'+ $this.find("option:eq(0)").html()+'<i class="none"></i></span>';
        gettxt = $(gettxt);       
        gettxt.insertBefore($this);
        $this.parents(".selectstyle").addClass("select-"+ this.id);
        $this.on("change.resize",function  () {      
          var vl = $(this).find("option:selected").html();
          $(this).prev('.val').html(vl);
          $(this).parents(".selectstyle").find('.val').html(vl);
    
          var ind = $(this).find("option:selected").index();
    
          if (ind == 0) {
            $(this).parents(".selectstyle").find('.val').addClass('firstval');
          }else{
            $(this).parents(".selectstyle").find('.val').removeClass('firstval');        
          }
    
        })
        $this.trigger('change.resize');
      }
    
      function Plugin(option) {
        return this.each(function (n) {
          var $this   = $(this)
          var number = $this.attr('id') || n 
          var data    = $this.data('ck.select')
          var options = typeof option == 'object' && option
          if (!data) $this.data('ck.select', (data = new Select(number)))
          if (option == 'build') data.build($(this))
          else if (option) data.setState(option)
        })
      }
    
      Select.init = function  () {
        var $this = $(formSting);
        Plugin.call($this,'build');
      }
      
      $(document).ready(function() {
        var $this = $(formSting);
        Plugin.call($this,'build');
      })
    
      $.fn.formSelect = function  (options) {
        var $this = $(this);
        Plugin.call($this,'build');
      }
    
    
    })()