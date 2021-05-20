rm -f *.data
rm -f *.kml
rm -f pyclaw.log
rm -f setplot_kml.py
rm -f setplot_speeds.ypy
rm -f xgeoclaw


REMOVE_RESULTS=$1
if [ -n "${REMOVE_RESULTS}" ]; then
    echo "Removing local _output and _plots"
    rm -rf _output
    rm -rf _plots
fi