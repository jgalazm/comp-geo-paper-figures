# Easywave
According to these instructions https://gitext.gfz-potsdam.de/geoperil/easyWave
go to the easyWave submodule folder and run
```
cd easyWave/code
./bootstrap
./configure
make

```

Then copy on this folder the executable `easyWave` for example with
```
cp ../../easyWave/code/src/easywave .
```


To force easywave to export the whole grid instead of trimming the results make these changes:

```diff
diff --git a/code/src/ewSource.cpp b/code/src/ewSource.cpp
index f7bbccb..83852db 100644
--- a/code/src/ewSource.cpp
+++ b/code/src/ewSource.cpp
@@ -198,7 +198,8 @@ int ewSource()
       else
         dz = Node(idx(j,i), iH) = 0.;

-      if( fabs(dz) > Par.sshClipThreshold ) {
+      // if( fabs(dz) > Par.sshClipThreshold ) {
+      if(true){
         Imin = My_min( Imin, i );
         Imax = My_max( Imax, i );
         Jmin = My_min( Jmin, j );
@@ -210,10 +211,10 @@ int ewSource()
@@ -210,10 +211,10 @@ int ewSource()

   if( Imin == NLon ) return Err.post( "Zero initial displacement" );

-  Imin = My_max( Imin - 2, 2 );
-  Imax = My_min( Imax + 2, NLon-1 );
-  Jmin = My_max( Jmin - 2, 2 );
-  Jmax = My_min( Jmax + 2, NLat-1 );
+  // Imin = My_max( Imin - 2, 2 );
+  // Imax = My_min( Imax + 2, NLon-1 );
+  // Jmin = My_max( Jmin - 2, 2 );
+  // Jmax = My_min( Jmax + 2, NLat-1 );

   return 0;
 }
 ```