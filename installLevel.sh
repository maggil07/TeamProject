ls *.json | sed 's/.courses.json//' | while read col; do mongoimport -d CSMadnessDB -c courses < $col;
done
