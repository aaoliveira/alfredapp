(function($) {

    // $('.icheck, input:checkbox, input:radio').iCheck({
    //     checkboxClass: 'icheckbox_flat',
    //     increaseArea: '50%'
    // });
    $('.panel-danger :checkbox.checkbox').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-red',
        increaseArea: '50%'
    });

    
    $(':checkbox.success').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green',
        increaseArea: '50%'
    });
    $(':checkbox.info').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue',
        increaseArea: '50%'
    });
    $(':checkbox.danger').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-red',
        increaseArea: '50%'
    });
    $(':checkbox.primary').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue',
        increaseArea: '50%'
    });



    $('.panel-collapse').on('hidden', function () {
        console.log('Colapsado!');
    });


    // $('table.sortable').dataTable( {
    //     "paging":   false,
    //     "ordering": true,
    //     "info":     false,
    //     "lengthMenu": false,
    //     "language": {
    //         processing:     "Processando...",
    //         search:         "Procurar: ",
    //         lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
    //         info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
    //         infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
    //         infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
    //         infoPostFix:    "",
    //         loadingRecords: "Carregando...",
    //         zeroRecords:    "Nada encontrado",
    //         emptyTable:     "Tabela vazia",
    //         paginate: {
    //             first:      "Primeiro",
    //             previous:   "Anterior",
    //             next:       "Próximo",
    //             last:       "Último"
    //         },
    //         aria: {
    //             sortAscending:  ": organizar coluna em ordem crescente",
    //             sortDescending: ": organizar coluna em ordem decrescente"
    //         }
    //     }
    // } );


    // $("select[name='uf']").selecter({
    //     label: "Estado",
    //     cover: true
    // });
    $(".select").selecter({                
        cover: false
    });



    $("button#submit, a#submit").click(function(e){
        e.preventDefault();

        var f = $(this).attr( "data-target" );   
        $(f).submit();
    
    });    


    // $(':checkbox').on('ifClicked', function(event){

    //     tarefa = this.id;
    //     $('.'+tarefa).delay(500).slideUp('fast');
    //     //this.form.submit();
    //     //alert(event.type + ' callback');
    // });

    $('a.opentask').on('click', function(e){
        e.preventDefault();

        myApp.showPleaseWait();

        console.log('Clicked');
    })


    // Procurar item (searchable.js)
    // $( '.list-group' ).searchable({
    //     searchField   : '.search input',
    //     selector      : '.list-group-item',
    //     childSelector : '.search-data',
    //     striped       : true,
    //     oddRow        : { 'background-color': '#f5f5f5' },
    //     evenRow       : { 'background-color': '#fff' },
    //     hide          : function( elem ) {
    //         elem.fadeOut(50);
    //     },
    //     show          : function( elem ) {
    //         elem.fadeIn(50);
    //     },
    //     searchType    : 'default',
    //     onSearchActive : function( elem, term ) {
    //         elem.show();
    //     },
    //     onSearchEmpty: function( elem ) {
    //         elem.hide();
    //     },
    //     onSearchFocus: function() {
    //         $( '#feedback' ).show().text( 'Type to search.' );
    //     },
    //     onSearchBlur: function() {
    //         $( '#feedback' ).hide();
    //     },
    //     clearOnLoad: true

    // });

    
    /**
     * PROCURAR CLIENTES (AJAX)
     * @param  (string)query
     * @return (json)
     */
    $('#search').on('submit', function(e){
        e.preventDefault();
        stop();
        var loading = $(this).find('.btn i.fa');
        loading.removeClass('fa-search').addClass('fa-refresh fa-spin');

        var clientes_list = $('.list-clientes .list-group-item');        
        clientes_list.slideUp('fast', function(){
            this.remove();
        });

        var request = $.ajax({
          url: $(this).attr('action'),
          type: "GET",
          data: $(this).serialize(),
          dataType: "json"
        });

         
        request.done(function( msg ) {
               
            $.each( msg, function(i, item) { 
                 var clienteItem =   '<a href="clientes/'+item.id+'" class="list-group-item">'
                                    +'    <span class="pull-left cliente-avatar" style="background-color:#3bafda">'
                                    +'        <img src="img/avatar-small.png" alt="">'
                                    +'    </span>'
                                    +'    <div class="search-data">'
                                    +'        <strong class="list-group-item-heading">'+item.nome+'</strong><br>'
                                    +'        <strong>'+item.empresa+'</strong><br>'
                                    +'        <i class="fa fa-map-marker"></i> '+item.cidade+' - '+item.uf+' | '
                                    +'        <i class="fa fa-phone"></i> '+item.telefone+'|'
                                    +'        <i class="fa fa-mobile"></i> '+item.celular+' '
                                    +'    </div>'
                                    +'</a>';

                $( clienteItem ).appendTo( $('.list-clientes') );
            });
            
            clientes_list.slideDown('slow');
            loading.removeClass('fa-refresh fa-spin').addClass('fa-search');

            if(msg.length > 0){
                // alert();
            }
        });
         
        request.fail(function( jqXHR, textStatus ) {
           console.log( "Request failed: " + textStatus );
        });

    });


    /**
     * FECHA NOTIFICAÇÃO (AJAX)
     * @param  (string)query
     * @return (json)
     */    
    $('.alert.notification').on('close.bs.alert', function () {
        // alert('fechado');

        // e.preventDefault();
        // stop();
        var loading = $('.loading');
        loading.removeClass('animated, fadeOut').addClass('animated, fadeIn');

        // var clientes_list = $('.list-clientes .list-group-item');        
        // clientes_list.slideUp('fast', function(){
        //     this.remove();
        // });

        var request = $.ajax({
          url: $(this).attr('data-url'),
          type: "GET",
          data: '',
          dataType: "json"
        });

         
        request.done(function( item ) {
               
            //$.each( msg, function(i, item) { 
                loading.removeClass('fadeIn').addClass('fadeOut');
                    var notificationItem    ='<div class="alert alert-'+item.class+'">'
                                            +'    <small class="pull-right timeago" title="'+item.created_at+'"></small>'
                                            +'    <strong>'+item.title+'</strong><br>'
                                            +'    <p>'+item.message+'</p>'
                                            +'</div>';

                //  var clienteItem =   '<a href="clientes/'+item.id+'" class="list-group-item">'
                //                     +'    <span class="pull-left cliente-avatar" style="background-color:#3bafda">'
                //                     +'        <img src="img/avatar-small.png" alt="">'
                //                     +'    </span>'
                //                     +'    <div class="search-data">'
                //                     +'        <strong class="list-group-item-heading">'+item.nome+'</strong><br>'
                //                     +'        <strong>'+item.empresa+'</strong><br>'
                //                     +'        <i class="fa fa-map-marker"></i> '+item.cidade+' - '+item.uf+' | '
                //                     +'        <i class="fa fa-phone"></i> '+item.telefone+'|'
                //                     +'        <i class="fa fa-mobile"></i> '+item.celular+' '
                //                     +'    </div>'
                //                     +'</a>';

                $( notificationItem ).prependTo( $('#notifications .alert-group') );
                $('.timeago').timeago();
               
            //});
            
            // clientes_list.slideDown('slow');
            // loading.removeClass('fa-refresh fa-spin').addClass('fa-search');

            if(item.length > 0){
                // alert();
            }
        });
         
        request.fail(function( jqXHR, textStatus ) {
           loading.removeClass('fadeIn').addClass('fadeOut');
           console.log( "Request failed: " + textStatus );
        });

    });


    //
    //  Menu Toggle Script    
    //  
    $("a.menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");

        if( $("#wrapper.toggled").length > 0 ){            
            $("a.menu-toggle i").removeClass('fa-chevron-right');
            $("a.menu-toggle i").addClass('fa-chevron-left');
        }else{
            $("a.menu-toggle i").removeClass('fa-chevron-left');
            $("a.menu-toggle i").addClass('fa-chevron-right');
        }

    });


    // 
    // Price Format
    // 
    $('.price').priceFormat({        
        prefix: '',
        centsSeparator: ',',
        thousandsSeparator: '.',
        allowNegative: true
    });

    $('.money').priceFormat({        
        prefix: 'R$ ',
        centsSeparator: ',',
        thousandsSeparator: '.',
        allowNegative: false
    });
    // $('.price').on('change', function () {
    //     $(this).priceFormat({        
    //         prefix: 'R$ ',
    //         centsSeparator: ',',
    //         thousandsSeparator: '.'
    //     });
    // });



    /**
     * SELECIONAR FORNECEDOR (AJAX)
     * @param  (string)query
     * @return (json)
     */
    $('select#fornecedor_id').on('change', function(e){
        

        var preloader = $('.preloader');
        preloader.removeClass('flipOutX').addClass('flipInX').show();
        $('#fornecedor_display').hide().html('');

        
        console.log( $(this).val() );

        //preloader.removeClass('fa-search').addClass('fa-refresh fa-spin');

        // var clientes_list = $('.list-clientes .list-group-item');        
        // clientes_list.slideUp('fast', function(){
        //     this.remove();
        // });
        


        var request = $.ajax({
            url: $('#fornecedores_url').val() + '/' + $(this).val(),
            type: "GET",
            dataType: "json"
        });

         
        request.done(function( f ) {
            var count = Object.keys( f ).length
            
                if( count > 0 ){
                    var fornecedor =     '<strong>'+f.nome+'</strong><br>'
                                        +f.cidade+' - '+f.uf+'<br>'
                                        +f.telefone+'<br>'
                                        +f.celular;
                    $('#fornecedor_display').append( fornecedor ).show();                    
                }

                preloader.removeClass('flipInX').addClass('flipOutX').hide();
            
            // clientes_list.slideDown('slow');
            // preloader.removeClass('fa-refresh fa-spin').addClass('fa-search');

            // if(msg.length > 0){
            //     // alert();
            // }
        });
         
        request.fail(function( jqXHR, textStatus ) {
            console.log( jqXHR );
            console.log( textStatus );

            preloader.removeClass('flipInX').addClass('flipOutX').hide();

            setTimeout(function() {
            
            }, 2000);


           // console.log( "Request failed: " + textStatus );
        });

    });
    $('select#fornecedor_id').trigger('change');


    /**
     *  MASK INPUTS
     */
    $(".mask.date").mask("99/99/9999");
    $(".mask.phone").mask("(99) 9999-9999");
    $(".mask.ie").mask("");
 

    /**
     * WYSIWYG
     */
    $('.wysiwyg').wysihtml5({
        toolbar: {
            "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
            "emphasis": true, //Italics, bold, etc. Default true
            "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
            "html": true, //Button which allows you to edit the generated HTML. Default false
            "link": false, //Button to insert a link. Default true
            "image": true, //Button to insert an image. Default true,
            "color": true, //Button to change color of font  
            "blockquote": false, //Blockquote  
            "size": 'sm', //default: none, other options are xs, sm, lg
            "fa": true
        }        
    });

    // var myCustomTemplates = {
    //   html : function(locale) {
    //     return "<li>" +
    //            "<div class='btn-group btn-group-sm'>" +
    //            "    <a class='btn btn-primary btn-sm' data-wysihtml5-action='change_view' title='" + locale.html.edit + "'>HTML</a>" +
    //            "</div>" +
    //            "</li>";
    //   }
    // }


    // tinymce.init({
    //     selector: "textarea",                
    //     mode : "textareas",
    //     language : "pt",
    //     menubar: false,
    //     toolbar_items_size: 'small',
    //     statusbar : false,
    //     preview_styles: true,
    //     fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
    //     theme_advanced_font_sizes: "14px,16px,18px,20px",
    //     font_size_style_values : "14px,16px,18px,20px",
    //     plugins: [
    //         "advlist autolink lists link charmap print preview anchor",
    //         "searchreplace visualblocks code fullscreen",
    //         "insertdatetime media table paste"
    //     ],
    //     toolbar: "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist "
    // });


    //LIMPA MODALS
    $('body').on('hidden.bs.modal', '.modal', function () {
        $(this).removeData('bs.modal');

    });

    // Time ago
    jQuery.timeago.settings.strings = {
       prefixAgo: "",
       prefixFromNow: "em",
       suffixAgo: null,
       suffixFromNow: null,
       seconds: "alguns segundos atrás",
       minute: "há um minuto",
       minutes: "há %d minutos",
       hour: "há uma hora",
       hours: "à %d horas atrás",
       day: "ontem",
       days: "daqui à %d dias",
       month: "mês passado",
       months: "há %d meses",
       year: "ano passado",
       years: "há %d anos"
    };
    $('.timeago').timeago();




    /**
     *  QUICK ADD TASK
     */
    $( ".add_next" ).click(function() {
       $( ".next" ).toggle();
    });


    /**
     *  CALENDAR
     */
    // $('#calendar').fullCalendar({
    //     events: {
    //         url: "{{url('eventos')}}",
    //         data: function() { // a function that returns an object
    //             return {
    //                 dynamic_value: Math.random()
    //             };
    //         }
    //     },
    //     header: {
    //         left: 'prev,next today',
    //         center: 'title',
    //         right: 'month,agendaWeek,agendaDay'
    //     },
    //     editable: true,
    //     eventClick: function(event, element) {
    //         console.log(event);
    //         event.title = "CLICKED!";
    //         $('#calendar').fullCalendar('updateEvent', event);
    //     },
    //     eventDrop: function(event, delta) {
    //         alert(event.title + ' was moved ' + delta + ' days\n' +
    //             '(should probably update your database)');
    //     },
    //     loading: function(bool) {
    //         if (bool){
    //             console.log('loading...');
    //            $('.loading').removeClass('fadeOut fadeIn').addClass('fadeIn');  
    //         }else{
    //             console.log('ready!');
    //            $('.loading').addClass('fadeOut');
    //         }    
    //     }
    // });    


    //$('table.dynatable').dynatable();




    // NOTIFICATIONS
    setInterval(function() {    
        jQuery.ajax({
            url: jQuery('.notification-info').attr('data-url'),
            type: 'GET',
            dataType: 'json',            
            complete: function(xhr, textStatus) {
                //called when complete
            },
            success: function( notifications ) {
                if( notifications.length ){
                    $('.notification-info .badge').text( notifications.length ).fadeIn('fast').css('display','inherit');                
                }else{
                    $('.notification-info .badge').text( notifications.length ).fadeOut('slow');                
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                //called when there is an error
            }
        }).done(function( html ) {

        });
        
    }, 5000);




        /*
    
            TAREFAS

        */
        $('.tarefas').isotope({
          itemSelector: '.tarefa'
        });

        // $('.transactions').isotope({
        //     itemSelector: '.item',
        //     layoutMode:   'vertical'
        // });


        /**

            TRANSACTIONS
        
        **/        
          // init Isotope
        var $container = $('.transactions').isotope({
            layoutMode: 'vertical',
            getSortData: {
                type: '[data-type]',                
                date: '[data-date]',
                done: '[data-done]',   
                descr: '.descr'              
            }   
        });

        // FILTERS
        $('.filters .btn').click(function(event) {
            $container.isotope({ filter: $(this).data('filter') });
            //console.log( $(this).data('filter') );
        });
          

        $('.sort .btn').click(function(event) {
            var sortValue = $(this).data('sort-value');
            console.log( sortValue );
            $container.isotope({ sortBy: sortValue });
        });

        // change .active class on buttons
        $('.sort.btn-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', '.btn', function() {
                $buttonGroup.find('.active').removeClass('active');
                $( this ).addClass('active');
            });
        });


            

    /*
    
        IMPRIME PÁGINA

    */
    printFrame = function(frame_id){
        window.frames[frame_id].focus();
        window.frames[frame_id].print();
    }

     // function print(url)
     //    {
     //        var _this = this,
     //        iframeId = 'iframeprint',
     //        $iframe = $('iframe#iframeprint');
     //        $iframe.attr('src', url);

     //        $iframe.load(function() {
     //            _this.callPrint(iframeId);
     //        });
     //    }

     //    //initiates print once content has been loaded into iframe
     //    function callPrint(iframeId) {
     //        var PDF = document.getElementById(iframeId);
     //        PDF.focus();
     //        PDF.contentWindow.print();
     //    }

    $('a.print').click(function(e) {
        e.preventDefault();
        var frame_id  = $(this).data('print');
        document.getElementById( frame_id ).contentWindow.focus();
        document.getElementById( frame_id ).contentWindow.print();        
        //printFrame( $(this).data('print') );
    });



    $('a.select_all').click(function(e) {
        e.preventDefault();
        $('input.checkbox').attr('checked', 'checked');        
    });
    

        // $('.fa-led').addClass('success');
        // $('.fa-led').removeClass('danger');    
    //console.log('Document ready!');

})(jQuery);



$(window).load(function (){
    $('.loading').addClass('fadeOut');    
    //console.log('Window load!');
});


/**

    E-MAILS

**/




    var magicSendMail = function(event){

        $('form.ajaxsend').submit(function(event) {


            $('.form-group').removeClass('has-error'); // remove the error class
            $('.help-block').remove(); // remove the error text

            var formData = $(this).serialize();

            // process the form
            $.ajax({
                type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : $(this).attr('action'), // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                encode      : true
            })
                // using the done promise callback
                .done(function(data) {

                    // log data to the console so we can see
                    console.log(data); 

                    // here we will handle errors and validation messages
                    if ( ! data.success) {
                        
                        // handle errors for name ---------------
                        if (data.errors.name) {
                            $('#name-group').addClass('has-error'); // add the error class to show red input
                            $('#name-group').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
                        }

                        // handle errors for email ---------------
                        if (data.errors.email) {
                            $('#email-group').addClass('has-error'); // add the error class to show red input
                            $('#email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
                        }

                        // handle errors for superhero alias ---------------
                        if (data.errors.superheroAlias) {
                            $('#superhero-group').addClass('has-error'); // add the error class to show red input
                            $('#superhero-group').append('<div class="help-block">' + data.errors.superheroAlias + '</div>'); // add the actual error message under our input
                        }

                    } else {

                        // ALL GOOD! just show the success message!
                        $('form').append('<div class="alert alert-success">' + data.message + '</div>');

                        // usually after form submission, you'll want to redirect
                        // window.location = '/thank-you'; // redirect a user to another page

                    }
                })

                // using the fail promise callback
                .fail(function(data) {

                    // show any errors
                    // best to remove for production
                    console.log(data);
                });

            // stop the form from submitting the normal way and refreshing the page
            event.preventDefault();
        });


    };


$(function () {       
        var addFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
            var $formGroupClone = $formGroup.clone();

            $(this)
                .toggleClass('btn-success btn-add btn-danger btn-remove')
                .html('–');

            $formGroupClone.find('input').val('');

            $formGroupClone.find('input').autocomplete({
                serviceUrl: "/emails/getcontacts",
                groupBy: 'type', 
                onSelect: function (suggestion) {
                    $(this).val( suggestion.value );
                }
            });

            $formGroupClone.find('.concept').text('Phone');
            $formGroupClone.insertAfter($formGroup);

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', true);
            }
        };

        var removeFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', false);
            }

            $formGroup.remove();
        };

        var selectFormGroup = function (event) {
            event.preventDefault();

            var $selectGroup = $(this).closest('.input-group-select');
            var param = $(this).attr("href").replace("#","");
            var concept = $(this).text();

            $selectGroup.find('.concept').text(concept);
            $selectGroup.find('.input-group-select-val').val(param);

        }

        var countFormGroup = function ($form) {
            return $form.find('.form-group').length;
        };

        $(document).on('click', '.btn-add', addFormGroup);
        $(document).on('click', '.btn-remove', removeFormGroup);
        $(document).on('click', '.dropdown-menu a', selectFormGroup);

    });    