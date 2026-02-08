import os
import django
import sys

# Add the project root to the python path
sys.path.append('/home/mredwin/.gemini/antigravity/scratch/nobodyspaper/backend')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from nobodyspaper.models import InfoPage

content = """
<p style="font-size: 1.4rem; font-style: italic; margin-bottom: 3rem;">
    Nobody’s Paper er et stille rom for tanker som ikke roper.
</p>

<p>
    Dette er ikke en nyhetsside.<br>
    Ikke et manifest.<br>
    Ikke et forsøk på å overbevise.
</p>
<p>
    Det er et arkiv av notater, korte tekster og fragmenter – skrevet for å forstå, ikke for å vinne. Noen ganger er det refleksjoner, andre ganger spørsmål. Ofte er det bare forsøk på å sette ord på noe som ellers ville blitt liggende uformulert.
</p>
<p>
    Navnet kommer av et enkelt ønske:<br>
    Å skrive uten å måtte være noen.<br>
    Uten posisjon, uten rolle, uten forventning.
</p>
<p>
    Tekstene her er ikke ment å være ferdige svar. De er spor av tanker i bevegelse. Hvis noe treffer, er det fint. Hvis ikke, er det også greit.
</p>

<hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.1); opacity: 0.3;">

<p>
    Dette er et sted for langsom lesing.<br>
    For det uperfekte.<br>
    For det som ikke alltid passer inn.
</p>

<p style="margin-top: 3rem; opacity: 0.6;">
    —<br>
    Nobody
</p>
"""

InfoPage.objects.update_or_create(
    slug='about',
    defaults={
        'title': 'About',
        'content': content
    }
)

print("About page seeded successfully.")
