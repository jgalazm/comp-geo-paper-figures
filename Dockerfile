FROM jupyter/scipy-notebook:8d32a5208ca1
RUN wget https://ngdc.noaa.gov/mgg/global/relief/ETOPO1/data/ice_surface/cell_registered/netcdf/ETOPO1_Ice_c_gmt4.grd.gz 
RUN gzip -d ETOPO1_Ice_c_gmt4.grd.gz
RUN mkdir data && mv ETOPO1_Ice_c_gmt4.grd data/

RUN wget https://gitext.gfz-potsdam.de/id2/geoperil/easyWave/-/raw/master/bin/r34/easywave_r34_omp_x64.tar.gz
RUN mkdir easywave
RUN tar zxvf easywave_r34_omp_x64.tar.gz 
RUN rm easywave_r34_omp_x64.tar.gz 
ENV PATH  $PATH:/home/jovyan/easywave/bin

RUN pip install netcdf4
