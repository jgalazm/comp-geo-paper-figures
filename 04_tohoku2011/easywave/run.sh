rm -rf *.ssh
rm -rf *.log
rm -rf eWave*
rm -rf error.msg
easywave -grid ../../03_biobio2010/data/bathymetryEasywave_3min.grd -source ../data/fault.flt  -time 1580 -pois ../data/pois.txt -poi_report