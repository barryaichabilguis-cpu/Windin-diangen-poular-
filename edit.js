/* Bouton « Modifier la leçon » — édition locale dans la page, sans serveur ni ressource externe.
   L'enregistrement produit une copie HTML téléchargée ; l'envoyer par email au responsable pour publication. */
(function () {
  if (!/\/lecons\//.test(location.pathname)) return;
  var main = document.querySelector('main');
  if (!main) return;

  var bar = document.createElement('div');
  bar.className = 'editbar';

  var edit = document.createElement('button');
  edit.className = 'btn'; edit.type = 'button';
  edit.textContent = '\u270f\ufe0f Modifier la leçon';

  var quit = document.createElement('button');
  quit.className = 'btn secondary'; quit.type = 'button'; quit.style.display = 'none';
  quit.textContent = '\u2716 Quitter la modification';

  var save = document.createElement('button');
  save.className = 'btn'; save.type = 'button'; save.style.display = 'none';
  save.textContent = '\ud83d\udcbe Enregistrer la copie modifiée';

  var hint = document.createElement('p');
  hint.className = 'small'; hint.style.display = 'none';

  bar.appendChild(edit);
  bar.appendChild(quit);
  bar.appendChild(save);
  bar.appendChild(hint);
  main.insertBefore(bar, main.firstChild);

  var on = false;
  function setMode(v) {
    on = v;
    if (v) { main.setAttribute('contenteditable', 'true'); }
    else { main.removeAttribute('contenteditable'); }
    edit.style.display = v ? 'none' : '';
    quit.style.display = v ? '' : 'none';
    save.style.display = v ? '' : 'none';
    hint.style.display = v ? '' : 'none';
    if (v) {
      hint.textContent = '\u2139 Mode modification activé : touchez le texte pour l\u2019éditer (l\u2019écriture arabe harmonisée reste en gras). Enregistrez ensuite une copie ci-dessus, puis envoyez-la par email à babaibrahimsalama@gmail.com pour publication.';
    }
  }

  edit.addEventListener('click', function () { setMode(true); main.focus(); });
  quit.addEventListener('click', function () { setMode(false); });

  save.addEventListener('click', function () {
    setMode(false);
    var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    setMode(true);
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (location.pathname.split('/').pop() || 'lecon.html');
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  });
})();
