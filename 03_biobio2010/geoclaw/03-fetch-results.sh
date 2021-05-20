mkdir -p _output
echo "Fetching time series . . ."
# scp jdgalaz@mazinger.ing.puc.cl:/home/jdgalaz/work/03_biobio2010/geoclaw/_output/gauge*.txt _output

FETCH_FRAMES=$1

if [ -n "${FETCH_FRAMES}" ]; then
    echo "Fetching frames . . ."
    scp jdgalaz@mazinger.ing.puc.cl:/home/jdgalaz/work/03_biobio2010/geoclaw/_output/fort.* _output
fi