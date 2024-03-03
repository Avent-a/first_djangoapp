$(document).ready(function () {
    $("#searchInput").on("input", function () {
        var searchTerm = $(this).val().toLowerCase();

        $(".order-row").each(function () {
            var date = $(this).find("td:eq(1)").text().toLowerCase();
            var status = $(this).find("td:eq(2)").text().toLowerCase();
            var employee = $(this).find("td:eq(3)").text().toLowerCase();
            var product = $(this).find("td:eq(4)").text().toLowerCase();
            var comment = $(this).find("td:eq(5)").text().toLowerCase();
            var office = $(this).find("td:eq(6)").text().toLowerCase();
            var hidden = $(this).find(".hidden-checkbox").prop("checked");

            if ((date.includes(searchTerm) || status.includes(searchTerm) || employee.includes(searchTerm) || product.includes(searchTerm) || comment.includes(searchTerm) || office.includes(searchTerm)) && (!hidden || (hidden && searchTerm === "false"))) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

$(document).ready(function () {
    // Обработка события клика по кнопке "Save changes"
    $('.Hidden-button').click(function () {
        // Перезагрузить страницу
        location.reload();
    });
});

$(document).ready(function () {
    // Установка CSRF-токена для AJAX-запросов
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    // Обработка события изменения чекбокса
    $('.hidden-checkbox').change(function () {
        // Получить id заказа
        var orderId = $(this).data('order-id');
        // Получить состояние чекбокса (выбран или нет)
        var isChecked = $(this).prop('checked');
        // Отправить AJAX-запрос для обновления состояния скрытости
        updateHiddenStatus(orderId, isChecked);
    });

    // Функция для отправки AJAX-запроса для обновления состояния скрытости
    function updateHiddenStatus(orderId, isChecked) {
        $.ajax({
            method: 'POST',
            url: '/update_hidden_status_orders/',
            data: {
                order_id: orderId,
                is_checked: isChecked,
                csrfmiddlewaretoken: getCookie('csrftoken')
            },
            success: function (data) {

                if (data.success) {
                    // В случае успеха можно выполнить дополнительные действия, если нужно
                    console.log('Состояние скрытости успешно обновлено.');

                } else {
                    console.error('Ошибка при обновлении состояния скрытости:', data.error);
                }
            },
            error: function (error) {
                console.error('Ошибка при обновлении состояния скрытости:', error);
            }
        });
    }

    $(document).ready(function () {
        // Скрыть все скрытые строки при загрузке страницы
        $('.order-row.hidden-row').hide();

        $('.Show-hidden-button').click(function () {
            // Переключить видимость только скрытых строк
            $('.order-row.hidden-row').toggle();
            // Обновить текст кнопки в зависимости от видимости скрытых строк
            var buttonText = $('.order-row.hidden-row').is(':visible') ? 'Hide hidden' : 'Show hidden';
            $(this).text(buttonText);
        });
    });
});


$(document).ready(function () {
    // Function to update table based on selected status
    function updateTable(status) {
        var rows = $('.order-row');
        rows.hide();
        if (status === '') {
            rows.not('.hidden-row').show();
        } else {
            rows.filter('[data-status="' + status + '"]').not('.hidden-row').show();
        }
    }

    // Handler for status filter change
    $('#statusFilter').change(function () {
        updateTable($(this).val());
    });

    // Handler for export button click
    $('.export-button').click(function () {
        var selectedStatus = $('#statusFilter').val();
        // Sending GET request to server with selected status
        window.location.href = '/export_to_word_orders/?status=' + selectedStatus;
    });

    // Initializing table based on selected status
    updateTable($('#statusFilter').val());
});
