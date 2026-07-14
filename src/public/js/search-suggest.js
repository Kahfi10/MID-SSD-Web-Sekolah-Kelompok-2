(function () {
    document.querySelectorAll('[data-search-suggest]').forEach(function (container) {
        var input = container.querySelector('input[type="text"]');
        var dropdown = container.querySelector('.search-suggest-dropdown');
        var form = container.querySelector('form');
        var apiUrl = container.getAttribute('data-search-suggest');
        var timer = null;

        if (!input || !dropdown) return;

        dropdown.addEventListener('mousedown', function (e) {
            e.preventDefault();
        });

        dropdown.addEventListener('click', function (e) {
            var link = e.target.closest('a');
            if (!link) return;
            var href = link.getAttribute('href');
            var label = link.getAttribute('data-label') || '';
            if (href && href !== '#') {
                window.location.href = href;
            } else if (label) {
                input.value = label;
                dropdown.classList.add('d-none');
                if (form) form.submit();
            }
        });

        input.addEventListener('input', function () {
            var val = input.value.trim();
            clearTimeout(timer);
            if (val.length < 2) {
                dropdown.classList.add('d-none');
                return;
            }
            timer = setTimeout(function () {
                fetch(apiUrl + '?q=' + encodeURIComponent(val))
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        dropdown.innerHTML = '';
                        if (data.length === 0) {
                            dropdown.classList.add('d-none');
                            return;
                        }
                        var html = '';
                        data.forEach(function (item) {
                            var label = item.full_name || item.student_name || item.username || '';
                            var sub = item.nis || item.email || item.role_name || item.class_name || '';
                            var href = item._href || '#';
                            html += '<a href="' + href + '" data-label="' + escapeHtml(label) + '" class="search-suggest-item">';
                            html += '<div style="font-size:0.9rem;font-weight:500;">' + highlight(label, val) + '</div>';
                            if (sub) html += '<div style="font-size:0.75rem;color:#86868b;">' + highlight(sub, val) + '</div>';
                            html += '</a>';
                        });
                        dropdown.innerHTML = html;
                        dropdown.classList.remove('d-none');
                    })
                    .catch(function () {
                        dropdown.classList.add('d-none');
                        dropdown.innerHTML = '';
                    });
            }, 300);
        });

        document.addEventListener('click', function (e) {
            if (!container.contains(e.target)) {
                dropdown.classList.add('d-none');
            }
        });

        input.addEventListener('focus', function () {
            if (dropdown.children.length > 0) {
                dropdown.classList.remove('d-none');
            }
        });

        function highlight(text, query) {
            var idx = text.toLowerCase().indexOf(query.toLowerCase());
            if (idx === -1) return escapeHtml(text);
            return escapeHtml(text.substring(0, idx)) + '<strong>' + escapeHtml(text.substring(idx, idx + query.length)) + '</strong>' + escapeHtml(text.substring(idx + query.length));
        }

        function escapeHtml(str) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }
    });
})();
