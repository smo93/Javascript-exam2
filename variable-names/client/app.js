$(document).ready(function() {
  var
    idToName = [],
    fieldSource = $('#variable-field').html(),
    fieldTemplate = Handlebars.compile(fieldSource);

  $.getJSON('http://localhost:8080/names', function(data) {

    idToName = _.groupBy(data, function(elem) { return elem.nameId; });

    var form = $('#name-fields');

    data.forEach(function(elem) {
      var field = $(fieldTemplate(elem));

      field.find('button').on('click', function() {
        var nameId = $(this).data('id'),
          newName = field.find('input').val();


        if(idToName[nameId].name !== newName) {
          $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/name',
            contentType: 'application/json',
            data: JSON.stringify({
              name: newName,
              nameId: nameId
            })
          });
        }

        return false;
      });

      field.find('input').on('keydown', function(e) {
        if(e.which === 13) {
          field.find('button').click();
          return false;
        }
      });

      form.append(field);
    });
  });
});
